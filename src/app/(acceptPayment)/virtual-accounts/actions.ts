"use server"

import { getUser } from "@/actions/users/getUser";
import { db } from "@/db";
import { VATransaction } from "@/db/schema";
import { URL_CREATE_VA } from "@/utils/constant";
import { DateTime } from "luxon";
import { z } from "zod/v4";

const createVASchema = z.object({
  expectedAmount: z.number().min(15000, "minimal 15.000").max(999999999, "maximal 999.999.999"),
  channels: z.array(z.string()).min(1, "at least select one channel")
})

export async function createVirtualAccount(prevState: any, formData: FormData) {
  const rawAmount = formData.get("expected_amount") as string | null;
  const data = {
    expectedAmount: rawAmount ? parseInt(rawAmount.replace(/\./g, ""), 10) : 0,
    channels: formData.getAll("channels")
  }

  const result = createVASchema.safeParse(data)
  if (result.error) {
    return {
      success: false,
      fields: {
        expectedAmount: rawAmount,
        channels: data.channels
      },
      errors: z.treeifyError(result.error),
    }
  }

  const user = await getUser()
  if (!user) {
    return {
      success: false,
      fields: {
        expectedAmount: rawAmount,
        channels: data.channels
      },
      errors: {
        errors: ["User not found"]
      },
    }
  }

  if (!user.purwantaraToken) {
    return {
      success: false,
      fields: {
        expectedAmount: rawAmount,
        channels: data.channels
      },
      errors: {
        errors: ["Please connect your Purwantara account first"]
      },
    }
  }

  const results: {
    channel: string;
    success: boolean;
    data?: Data;
    error?: {
      code: string;
      message: string;
      fields?: Record<string, string[]>;
    };
  }[] = [];


  try {
    const expiredAt = DateTime.now()
      .setZone("Asia/Jakarta") // atau langsung 'UTC+7' juga bisa
      .plus({ days: 1 })
      .toISO();
    const epochInSeconds = DateTime.now()
      .setZone("Asia/Jakarta")
      .plus({ days: 1 })
      .toSeconds();
    for (const channel of data.channels) {
      const res = await fetch(URL_CREATE_VA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.purwantaraToken}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({
          expected_amount: result.data.expectedAmount,
          name: "testing payment app",
          bank: channel,
          description: "testing payment app",
          expired_at: expiredAt,
          external_id: `EXID-${epochInSeconds}`,
          merchant_trx_id: `MTID-${epochInSeconds}`
        })
      })
      const json: ResponseCreateVA = await res.json()



      try {
        await db.insert(VATransaction).values({
          uuid: res.ok ? json.data!.uuid : `ERR-${crypto.randomUUID()}`,
          externalID: res.ok ? json.data?.external_id : `EXID-${epochInSeconds}`,
          name: res.ok ? json.data?.name : "ERROR",
          amount: res.ok ? parseInt(json.data?.amount ?? "0") : data.expectedAmount,
          fee: res.ok ? parseInt(json.data?.fee ?? "0") : 0,
          total: res.ok ? parseInt(json.data?.total ?? "0") : data.expectedAmount,
          feeChargedTo: res.ok ? json.data?.fee_charged_to : undefined,
          vaNumber: res.ok ? json.data?.va_number : undefined,
          description: res.ok ? json.data?.description : "Error from API",
          expiredAt: res.ok && json.data?.expired_at ? DateTime.fromISO(json.data.expired_at).toJSDate() : undefined,
          paymentCode: res.ok ? json.data?.payment_code : undefined,
          status: res.ok ? json.data?.status : json.error?.code ?? "ERROR",
          response: json,
        })

        if (res.ok) {
          results.push({
            channel: channel as string,
            success: true,
            data: json.data
          })
        } else {
          results.push({
            channel: channel as string,
            success: false,
            error: {
              code: json.error?.code!,
              message: json.error?.message!,
              fields: json.error?.fields
            }
          })
        }
      } catch (dbError) {
        results.push({
          channel: channel as string,
          success: false,
          error: {
            code: "DB_INSERT_ERROR",
            message: (dbError as Error).message,
          }
        })
      }
    }
  } catch (e) {
    console.error("Fatal error during VA creation process:", e);

    return {
      success: false,
      errors: {
        errors: ["Internal server error, please try again later"]
      },
      fields: {
        expectedAmount: rawAmount,
        channels: data.channels
      },
    }
  }
  return {
    success: true,
    data: results
  }
}

interface ResponseCreateVA {
  status: number;
  success: boolean;
  data?: Data;
  error?: {
    code: string;
    message: string;
    fields: Record<string, string[]>;
  }
}

interface Data {
  uuid: string;
  external_id: string;
  name: string;
  amount: string;
  fee: string;
  total: string;
  fee_charged_to: string;
  va_number: string;
  description: string;
  expired_at: string;
  payment_code: null;
  status: string;
}
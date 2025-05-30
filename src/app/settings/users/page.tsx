import Layout from '@/components/layout/Layout';
import UserSettingForm from './UserSettingForm';
import { getUser } from '@/actions/users/getUser';

const page = async () => {
  const user = await getUser()
  return (
    <Layout>
      <UserSettingForm user={user!} />
    </Layout>
  )
}

export default page
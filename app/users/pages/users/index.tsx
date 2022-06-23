import Layout from "../../../core/layouts/Layout"
import { UserDetail } from "../../components/userDetail/userDetail"
import { Card, Container, Grid, Space, Title } from "@mantine/core"
import { UserSettings } from "../../components/userSettings/UserSettings"
import { useCurrentUser } from "../../../core/hooks/useCurrentUser"
import { UserImageUpload } from "../../components/userImageUpload/UserImageUpload"
import { UserForm } from "../../components/userForm/UserForm"
import updateUserMutation from "../../mutations/updateUser"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import { showNotification } from "@mantine/notifications"
import getUser from "../../queries/getUser"

const AccountSettingsPage = () => {
  const user = useCurrentUser()

  return (
    <Container size={"lg"}>
      <Grid gutter={"xl"}>
        <Grid.Col xs={12} md={6} lg={6}>
          <UserDetail userId={user?.id} />
          <Space h={"xl"} />
          <Card withBorder p="xl" radius="md">
            <Title order={3}>User data</Title>
            <Space h={"xl"} />
            <UserForm user={user} />
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={6}>
          <UserSettings
            title={"Configure notifications"}
            description={"Choose what notifications you want to receive\n"}
            data={[
              {
                title: "Messages",
                description: "Direct messages you have received from other users",
              },
              {
                title: "Review requests",
                description: "Code review requests from your team members",
              },
              { title: "Comments", description: "Daily digest with comments on your posts" },
            ]}
          />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

AccountSettingsPage.authenticate = true
AccountSettingsPage.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default AccountSettingsPage

import Layout from "../../core/layouts/Layout"
import { UserDetail } from "../../users/components/userDetail/userDetail"
import { Container, Grid, Notification, Space } from "@mantine/core"
import { InfoCircle } from "tabler-icons-react"
import { PictureUpload } from "../../users/components/pictureUpload/pictureUpload"
import { UserSettings } from "../../users/components/userSettings/UserSettings"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const AccountSettingsPage = () => {
  const user = useCurrentUser()

  return (
    <Container size={"xl"}>
      <Space h={"lg"} />
      <Grid>
        <Grid.Col xs={12} md={6} lg={4}>
          <UserDetail userId={user?.id} />
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={4}>
          <PictureUpload />
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={4}>
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

AccountSettingsPage.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default AccountSettingsPage

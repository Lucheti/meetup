import Layout from "../../core/layouts/Layout"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { useEffect } from "react"
import { Routes, useRouter } from "blitz"
import { Text } from "@mantine/core"

const CheckEmail = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (currentUser?.emailVerified) {
      router.push(Routes.Home())
    }
  }, [currentUser])

  return (
    <div>
      <Text>Thanks for Signing Up!</Text>
      <Text>Please check your email to verify your account.</Text>
    </div>
  )
}

CheckEmail.redirectAuthenticatedTo = "/"
CheckEmail.getLayout = (page) => <Layout title="Verify Account">{page}</Layout>

export default CheckEmail

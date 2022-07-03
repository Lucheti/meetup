import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProvider from "../../mutations/createProvider"
import { ProviderForm } from "../../components/ProviderForm"
import { FORM_ERROR } from "final-form"
import { Container } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { createLoadingNotification } from "../../../core/hooks/createLoadingNotification"
import { CheckIcon } from "@modulz/radix-icons"

const NewProviderPage: BlitzPage = () => {
  const router = useRouter()
  const [createProviderMutation] = useMutation(createProvider)
  const withLoadingNotification = createLoadingNotification({
    loading: {
      title: "Creating...",
      message: "Signing up provider",
      loading: true,
    },
    success: {
      title: "New provider created!",
      message: "You will now start showing on the marketplace",
      loading: false,
      icon: <CheckIcon />,
      color: "teal",
      autoClose: 5000,
    },
    error: {
      title: "We have a problem",
      message: "Something went wrong. Please try again.",
    },
  })

  return (
    <Container size={"md"}>
      <h1>New Provider</h1>

      <ProviderForm
        submitText="Create Provider"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProvider}
        // initialValues={{}}
        onSubmit={async (values) => {
          if (!values?.images) {
            showNotification({
              message: "Please provide an image",
              color: "red",
            })
          }
          try {
            const provider = await withLoadingNotification(() => createProviderMutation(values))
            await router.push(Routes.ShowProviderPage({ providerId: provider.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Container>
  )
}

NewProviderPage.authenticate = true
NewProviderPage.getLayout = (page) => <Layout title={"Create New Provider"}>{page}</Layout>

export default NewProviderPage

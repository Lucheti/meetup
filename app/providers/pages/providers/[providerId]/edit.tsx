import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProvider from "../../../queries/getProvider"
import updateProvider from "../../../mutations/updateProvider"
import { ProviderForm } from "../../../components/ProviderForm"
import { FORM_ERROR } from "final-form"
import { Container } from "@mantine/core"

export const EditProvider = () => {
  const router = useRouter()
  const providerId = useParam("providerId", "string")
  const [provider, { setQueryData }] = useQuery(
    getProvider,
    { id: providerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProviderMutation] = useMutation(updateProvider)

  return (
    <>
      <Head>
        <title>Edit Provider {provider.name}</title>
      </Head>

      <Container size={"md"}>
        <h1>Edit Provider</h1>
        <ProviderForm
          submitText="Update Provider"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProvider}
          initialValues={provider}
          onSubmit={async (values) => {
            try {
              const updated = await updateProviderMutation({
                id: provider.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowProviderPage({ providerId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Container>
    </>
  )
}

const EditProviderPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProvider />
      </Suspense>

      <p>
        <Link href={Routes.ProvidersPage()}>
          <a>Providers</a>
        </Link>
      </p>
    </div>
  )
}

EditProviderPage.authenticate = true
EditProviderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProviderPage

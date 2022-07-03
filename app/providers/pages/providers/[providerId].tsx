import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import deleteProvider from "../../mutations/deleteProvider"
import getProvider from "../../queries/getProvider"

export const Provider = () => {
  const router = useRouter()
  const providerId = useParam("providerId", "string")
  const [deleteProviderMutation] = useMutation(deleteProvider)
  const [provider] = useQuery(getProvider, { id: providerId })

  return (
    <>
      <Head>
        <title>Provider {provider.name}</title>
      </Head>

      <div>
        <h1>Provider {provider.name}</h1>
        <pre>{JSON.stringify(provider, null, 2)}</pre>

        <Link href={Routes.EditProviderPage({ providerId: provider.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProviderMutation({ id: provider.id })
              router.push(Routes.ProvidersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProviderPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProvidersPage()}>
          <a>Providers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Provider />
      </Suspense>
    </div>
  )
}

ShowProviderPage.authenticate = true
ShowProviderPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProviderPage

import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTanka from "app/tankas/queries/getTanka"
import deleteTanka from "app/tankas/mutations/deleteTanka"

export const Tanka = () => {
  const router = useRouter()
  const tankaId = useParam("tankaId", "number")
  const [deleteTankaMutation] = useMutation(deleteTanka)
  const [tanka] = useQuery(getTanka, { id: tankaId })

  return (
    <>
      <Head>
        <title>Tanka {tanka.id}</title>
      </Head>

      <div>
        <h1>Tanka {tanka.id}</h1>
        <pre>{JSON.stringify(tanka, null, 2)}</pre>

        <Link href={Routes.EditTankaPage({ tankaId: tanka.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTankaMutation({ id: tanka.id })
              router.push(Routes.TankasPage())
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

const ShowTankaPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TankasPage()}>
          <a>Tankas</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Tanka />
      </Suspense>
    </div>
  )
}

ShowTankaPage.authenticate = true
ShowTankaPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTankaPage

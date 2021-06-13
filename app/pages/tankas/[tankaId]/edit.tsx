import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTanka from "app/tankas/queries/getTanka"
import updateTanka from "app/tankas/mutations/updateTanka"
import { TankaForm, FORM_ERROR } from "app/tankas/components/TankaForm"

export const EditTanka = () => {
  const router = useRouter()
  const tankaId = useParam("tankaId", "number")
  const [tanka, { setQueryData }] = useQuery(getTanka, { id: tankaId })
  const [updateTankaMutation] = useMutation(updateTanka)

  return (
    <>
      <Head>
        <title>Edit Tanka {tanka.id}</title>
      </Head>

      <div>
        <h1>Edit Tanka {tanka.id}</h1>
        <pre>{JSON.stringify(tanka)}</pre>

        <TankaForm
          submitText="Update Tanka"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTanka}
          initialValues={tanka}
          onSubmit={async (values) => {
            try {
              const updated = await updateTankaMutation({
                id: tanka.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTankaPage({ tankaId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTankaPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTanka />
      </Suspense>

      <p>
        <Link href={Routes.TankasPage()}>
          <a>Tankas</a>
        </Link>
      </p>
    </div>
  )
}

EditTankaPage.authenticate = true
EditTankaPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTankaPage

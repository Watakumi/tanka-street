import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTanka from "app/tankas/mutations/createTanka"
import { TankaForm, FORM_ERROR } from "app/tankas/components/TankaForm"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const NewTankaPage: BlitzPage = () => {
  const router = useRouter()
  const [createTankaMutation] = useMutation(createTanka)
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Tanka</h1>

      <TankaForm
        submitText="Create Tanka"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTanka}
        // initialValues={{}}
        initialValues={{ userId: currentUser && currentUser.id }}
        onSubmit={async (values) => {
          if (currentUser) {
            try {
              const tanka = await createTankaMutation(values)
              router.push(`/tankas/${tanka.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TankasPage()}>
          <a>Tankas</a>
        </Link>
      </p>
    </div>
  )
}

NewTankaPage.authenticate = true
NewTankaPage.getLayout = (page) => <Layout title={"Create New Tanka"}>{page}</Layout>

export default NewTankaPage

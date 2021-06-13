import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTankas from "app/tankas/queries/getTankas"

const ITEMS_PER_PAGE = 100

export const TankasList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tankas, hasMore }] = usePaginatedQuery(getTankas, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tankas.map((tanka) => (
          <li key={tanka.id}>
            <Link href={Routes.ShowTankaPage({ tankaId: tanka.id })}>
              <a>{tanka.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TankasPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tankas</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTankaPage()}>
            <a>Create Tanka</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TankasList />
        </Suspense>
      </div>
    </>
  )
}

TankasPage.authenticate = true
TankasPage.getLayout = (page) => <Layout>{page}</Layout>

export default TankasPage

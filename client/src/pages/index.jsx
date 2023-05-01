import Layout from "@/layout/Layout";
import Content from "@/components/Content";
import UserSupply from "@/components/UserSupply";
import GlobalSupply from "@/components/GlobalSupply";
export default function Home() {
  return (
    <Layout>
      <Content />
      <UserSupply />
      <GlobalSupply/>
    </Layout>
  )
}
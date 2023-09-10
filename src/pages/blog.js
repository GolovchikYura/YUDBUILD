import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
const BlogPage = ({ data }) =>{
    return (
        <Layout pageTitle="YUDBLOG">
        {
        data.allMdx.nodes.map((node) => (
          <article key={node.id}>
            <h2>{node.frontmatter.title}</h2>
            <p>Posted: {node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </article>
        ))
      }
        </Layout>
    )
}
export const query = graphql`
  query  {
    allMdx(sort: {frontmatter: {data: DESC}}) {
      nodes {
        frontmatter {
          data(formatString: "")
          title
        }
        id
        excerpt
      }
    }
  }
`
export const Head = () => <Seo title="YUDBLOG"/>

export default BlogPage
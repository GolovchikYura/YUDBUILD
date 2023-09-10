import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
const BlogPage = ({ data }) =>{
    return (
        <Layout pageTitle="YUDBLOG">
        <ul>
            {
                data.allFile.nodes.map(node =>(
                    <li key={node.name}>
                        {node.name}
                    </li>
                ))
            }
        </ul>
        </Layout>
    )
}
export const query = graphql`
query{
    allFile{
        nodes{
            name
        }
    }
}`
export const Head = () => <Seo title="YUDBLOG"/>

export default BlogPage
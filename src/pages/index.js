import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div key={post.id}>
                <h1>{post.frontmatter.rubrik1}</h1>
                <p>{post.frontmatter.service1}</p>

                <h1>{post.frontmatter.rubrik2}</h1>
                <p>{post.frontmatter.service2}</p>
                
                <h1>{post.frontmatter.rubrik3}</h1>
                <p>{post.frontmatter.service3}</p>
                
             <Img fluid={post.frontmatter.image.childImageSharp.fluid} />

                <div
                      className="post_content "
                      dangerouslySetInnerHTML={{ __html: post.frontmatter.html }}
                    />

                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            image {
              childImageSharp {
                resize(width: 1280, height: 700) {
                  src
                }
                fluid(maxWidth: 1280) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          
            rubrik1
            service1
            rubrik2
            service2
            rubrik3
            service3
            templateKey
          }
        }
      }
    }
  }
`

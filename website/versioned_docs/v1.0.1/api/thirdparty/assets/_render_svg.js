#!/usr/bin/env node


/**
 * Uses plantuml server to render a puml to svg
 */

const fs = require('fs')
const path = require('path')
const util = require('util')
const got = require('got')
const SVGO = require('svgo')
const plantumlEncoder = require('plantuml-encoder')

const rendererBaseUrl = process.env.PUML_BASE_URL || 'http://www.plantuml.com/plantuml'

svgo = new SVGO({
  js2svg: { pretty: true, indent: 2 },
  plugins: [
    { removeComments: true },
  ]
});

async function main() {
  let [_, _script, inputPath, outputPath] = process.argv

  if (!inputPath) {
    console.log("usage: ./_render_svg.js <input path> [<output path>]")
    process.exit(1)
  }

  // If not specified, replace .puml or .plantuml with `.svg`
  if (!outputPath) {
    outputPath = inputPath.replace('.puml', '.svg')
      .replace('.plantuml', '.svg')
  }

  const rawPumlContents = fs.readFileSync(inputPath)
  const encoded = plantumlEncoder.encode(rawPumlContents.toString())
  const url = path.join(rendererBaseUrl, 'svg', encoded)
  let result
  try {
    result = await got.get(url)
  } catch (err) {
    console.log('http request failed to render puml with error', err.message)
    if (err.message.indexOf('Response code 403') > -1) {
      console.log('Note: sometimes the public puml renderer fails when the input diagrams are too large. Try running your own renderer server with docker.')
    }

    if (err.message.indexOf('Response code 400') > -1) {
      console.log('This could be due to bad syntax in the puml diagram. Url is:')
      console.log(url)
    }

    process.exit(1)
  }

  // Strip comments and prettify svg
  // This makes sure that our .svg files are deterministic and diffable
  const formatted = await svgo.optimize(result.body)
  fs.writeFileSync(outputPath, formatted.data)
}

main()

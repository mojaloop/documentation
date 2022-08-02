#!/usr/bin/env node

/**
 * NOTES: 
 * - This file is an ESM Module (thus the extension `.mjs`). This is required for the `got` dependency which only supports ESM!
 * - Uses PlantUml server to render a PUML to SVG
 */

import fs from 'fs'
import path from 'path'
import util from 'util'
import got from 'got'
import * as SVGO from 'svgo'
import * as plantumlEncoder from 'plantuml-encoder'

const rendererBaseUrl = process.env.PUML_BASE_URL || 'http://www.plantuml.com/plantuml'

async function main() {

  let [_, _script, inputPath, outputPath] = process.argv

  if (!inputPath) {
    console.log("usage: ./_render_svg.mjs <input path> [<output path>]")
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
  // This makes sure that our .svg files are deterministic and diff'able
  const formatted = await SVGO.optimize(
    result.body,
    {
      path: outputPath,
      multipass: true,
      js2svg: { pretty: true, indent: 2 },
      plugins: [
        //// preset-defaults plugin override
        // {
        //   name: 'preset-default',
        //   params: {
        //     overrides: {
                // Insert overrides here.
        //     }
        //   }
        // },
        // removeComments plugin
        { 
          name: 'removeComments',
          params: {
            overrides: {
              active: true
            }
          }
        }
      ]
    }
  )
  fs.writeFileSync(outputPath, formatted.data)
}

main()

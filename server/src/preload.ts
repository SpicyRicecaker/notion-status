// All of the Node.js APIs are available in the preload process.

import { contextBridge } from "electron"
import { Client } from "@notionhq/client"
import * as dotenv from "dotenv"
dotenv.config()

const notion = new Client({ auth: process.env.NOTION_KEY })

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof NodeJS.ProcessVersions]
    )
  }
})

contextBridge.exposeInMainWorld("electron", {
  getInprogressItem: async (): Promise<any> => {
    const databaseId = process.env.NOTION_DATABASE_ID

    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "In progress",
        },
      },
    })

    return res
  },
})

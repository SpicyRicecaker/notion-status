Shows a small task bar based off of the `Name` property of what your current database item has a `Status` of `In progress`.

# How 2 Use

```shell
git clone https://github.com/SpicyRicecaker/notion-status
cd notion-status
npm i
cd front
npm build
cd ../server
touch .env 
```

then, modify `.env` to include `NOTION_KEY` and `NOTION_DATABASE_ID`
follow steps 1-3 in https://developers.notion.com/docs/create-a-notion-integration#step-1-create-an-integration for instructions on how to get the `NOTION_KEY` and `NOTION_DATABASE_ID`

Then run
```shell
npm start
```

# Nightclass: Building a WebApp from ground up 

For this first session, we want to build a e-commerce website with minimal functionnality.
We'll draw inspiration from: https://liquid.mock.shop/ or https://demo.vercel.store/

User should be able to:
- Access our homepage
- Browse our collections
- See any product details
- Search a item


# Exercices

# Step 1

## Create a project
Let's open a shell session wherever you want to start your project

```shell
npm create t3-app@latest
```

Follow the instructions and you should be able to run your app locally. 
Access your app from any browser at `http://localhost:3000`

## Create a repository on Github

Sign up or sign in to Github. Then add a new repository.

Then
```shell
git remote add origin git@github.com:$YOUR_GITHUB_HANDLE/$REPO_NAME.git
git branch -M main
git add --all
git commit -m "initial commit"
git push -u origin main
```

## Configure Planetscale
Sign up or sign in to Planetscale.

Create a new database.

Click "connect", then under "Connect with" choose "Prisma" and copy the content of the `.env` file to your `.env` file in your project.

Do the same for your `schema.prisma` file.

## Clean up unused code

We won't use authentication today so we need to comment the env var that are required for our app to work.
Comment out all code related to:

```
NEXTAUTH_SECRET
NEXTAUTH_URL
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
```

Then commit and push your changes.

## Deploy on Vercel

Sign up or sign in to Vercel using Github. Link your github account and select your repo to deploy the project.
Under the section "Environment variables" your should add the variables registered in `.env`.

You should be able to see your page up and running under a Vercel domain!

# Step 2

## Create a header

We want to be able to see our website name at the top and navigate to a few pages easily through a header.
Add a component at the top of the page with a few links to:
- the home page `/`
- the collection page for men `/collections/men`
- the collection page for women `/collections/women`
- the collection page for unisex `/collections/unisex`

If you need help creating you first component, you can refer to the React documentation: [https://react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

## Create a footer

We want to easily display our links (social medias), brand name and copyright at the bottom though a footer.
Add a new component containing a few links and copyright at the bottom of the page.

## Update the homepage

Since this will be the first page our user will reach we can update the main title of the page to welcome them.
Add a new heading for our page and edit the title attribute.

Learn more about the title tag from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) and how to change it in [NextJS](https://nextjs.org/docs/api-reference/next/head)

## Push your changes!

We made some decent edits. It's time to save all our code in Github.

```shell
git add --all
git commit -m "add header, footer, homepage"
git push origin main
```

Now we have to wait a few minutes for Vercel to pick up our changes and soon the mgic will happen...
...
Our changes are live!


# Step 3

## Create new pages

So far we only have a homepage. We actually want to display more than one. In NextJS, we can add a page by creating a new file and exporting a component.
The full NextJS routing documentation can be found [here](https://nextjs.org/docs/routing/introduction)
The complete process to add a new page is explained in detail in the [NextJS docs](https://nextjs.org/docs/basic-features/pages).

Create a `About.tsx` file in the `/pages` directory of your project.
Add the following content:
```tsx
function About() {
  return <div>About</div>
}

export default About
```

Now try to access `/about` on your app, it is that easy.

## Collections

### Creating a new page

Now that we learned how to create a new page, we can add a real one that will list all the collection of our shop.

Create a new page, accessible through the `/collections` url with a heading that reads "Collections".

### Iterate over a list

We can start by hardcoding a list of collection for our brand. We have 3 collections so far "Men", "Woman" and "Unisex".

Try to display the list of collections by using a `map` function and reading the [React docs about rendering list](https://react.dev/learn/rendering-lists)

### Upgrading our list

Instead of using a hardcoded list, we can use React `useState` function to manage the lifecycle of our data. You can learn more about [useState](https://react.dev/reference/react/useState)

```tsx
// /pages/collections/index.tsx
const [collections, setCollections] = useState([
  'Men',
  'Women',
  'Unisex',
])
```

### Getting and displaying external data

We want to display a page that lists all the collections. To get a list of collection we are going to use a third party API.
This is gonna be a fake one, a mock provided by Shopify: [mock.shop](https://mock.shop/)

This API is mostly design to be used as a graphQL mock, but we can also use it like a traditional endpoint using the native `fetch` function to get the data we want.
On  click on "Get 10 collections", then under "Code Example", select "fetch" and copy the sample.

We will use `fetch` to reach the API and get the data as a response, you can read about `fetch` on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
To manage our data, we need to use two more important part of React:
- `useState` to manage our local state, see the [React docs about useState](https://react.dev/reference/react/useState)
- `useEffect` to execute some code (our data-fetching) as a side-effect  [React docs about useEffect](https://react.dev/reference/react/useEffect)

In the end it should look something like this:
```tsx
// /pages/collections/index.tsx
const [data, setData] = useState()

useEffect(() => {
  fetch('SOME_URL')
    .then(response => response.json())
    .then(json => setData(json.path.to.data))
})
```

Hint: if Typescript is bothering you, instead of writing `any`, get ChatGPT to generate the type definition for you ;)

## Collections /:collection

We now want to display a list of all items within a specific collection. The route to the page should look like this `/collections/$COLLECTION_NAME`.

To build a dynamic segment in our url, we need to follow a specific naming convention from NextJS. This is described [here](https://nextjs.org/docs/routing/introduction#dynamic-route-segments)

We should create our new page under `/pages/collections/[collectionName].tsx`

Once we do that we will be able to extract the collection name in our component using NextJS' [router](https://nextjs.org/docs/api-reference/next/router).

```tsx
// /pages/collections/[collectionName].tsx
const router = useRouter()
const { collectionName } = router.query
```

Then we can get a new query from [mock.shop](https://mock.shop/) to get the list of items for a specific collection.

Hint: we can use [AI here too](https://mock.shop/ai)

## Products /:collection

Create a new page to display the detail of a product. It should be a dynamic page and you need to get the info for only one product.

# Step 4

## Create a search function
Add a search input to the header so that user can search a product from anywhere.

```tsx
// components/Header.tsx
const router = useRouter();

const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const keyword = e.target.elements[0].value as string;
    router.push(`/search?q=${keyword}`).catch(console.error);
};
// ...
<form onSubmit={handleSubmit}>
    <input
      type="text"
      className={"rounded border-[1px] border-solid border-slate-900"}
    />
    <button aria-label={"Search"} className={"mx-2"}>
      🔎
    </button>
</form>
```

Then we need to build the search result page. You are equipped with all the tool you need to build it yourself!

# Nightclass 2

# Exercices

# Step 1

We want to improve the user experience while browsing the application. So far we don't have any indication that the application is loading or that any type of error has happened.

We already have components ready to display those states but they are not being displayed yet.

We'll use the "search" functionality as an example for this session but once you're done with the search we'll be able to update any other page.

## Displaying a loading state

In `search.tsx` we have a variable that holds the data we want to display but nothing to keep track of the loading state.
We can add a `useState` to keep track of whether we are loading the result (or not) and set it accordingly based on the state of the request.
While the request is loading we could display a few `LoadingProducts.tsx` components to show that something is loading.

You can refer to the `TODO:#1` in `search.tsx` if you are unsure what to do.


## Displaying an error state

In `search.tsx` we can do something very similar to what we just did to also manage any error that might arise.
We can add another `useState` to choose whether we should display an error message to our users when the request to get the data fails.
When there's an actual error we should display a `Error.tsx` component instead of trying to display a list of results.

You can refer to the `TODO:#2` in `search.tsx` if you are unsure what to do.

## Displaying an empty state 

When there is no valid results to be displayed, the search page looks empty. We could also display a specific component to show the lack of results.
Display `NoResults.tsx` when the result of the search is empty.

You can refer to the `TODO:#3` in `search.tsx` if you are unsure what to do.

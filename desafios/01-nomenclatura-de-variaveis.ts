// Nomenclatura de variáveis

const categoryListByFollowers = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const github = String(req.query.username)

  if (!github) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${github}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${github}" not found`
    })
  }

  const githubData = await response.json()

  const orderListByFollowers = categoryListByFollowers.sort((a, b) =>  b.followers - a.followers); 

  const categoryByFollowers = orderListByFollowers.find(i => githubData.followers > i.followers)

  const result = {
    github,
    category: categoryByFollowers.title
  }

  return result
}

getData({ query: {
  username: 'josepholiveira'
}}, {})
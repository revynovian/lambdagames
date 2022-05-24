This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## LambdaGames

Lambda Games is a online platform single player 2D classic games (e.g. snakes, rock-paper-scissor, tic-tac-toe, etc.). Users can create account and save their score and compete with other to take the top leaderboard.

---
**Preview**

<a href="https://ibb.co/31PDZbx"><img src="https://i.ibb.co/XXGhRPn/homepage-1.png" alt="homepage-1" border="0" /></a>

---
**How to Setup the Project (Front End Side)**

add environmental variables for API baseURL, Cloudinary API, and Cloudinary Preset

```bash
e.g 
NEXT_PUBLIC_API_URL=https://immense-sierra-85328.herokuapp.com/
NEXT_PUBLIC_CLOUDINARY_API=https://api.cloudinary.com/v1_1/username/image/upload
NEXT_PUBLIC_CLOUDINARY_PRESET_PROFILE=binar-profileimg
NEXT_PUBLIC_CLOUDINARY_PRESET_COVER=binar-coverimg
```

install dependencies

```bash
npm install
```

and run the development server:

```bash
npm run dev
# or
yarn dev
```

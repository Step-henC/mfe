# What is This? 
Micro Frontends are ideal for scalability and quicker development as teams work on different pages and components of a frontend for a website. Professionally, I have experience with Single-spa but, this
project focuses on the basics of Microfrontends. Importantly, this application prevents css of different apps affecting one another and includes basic authentication routing logic, as seen in the video.
More on MFE's can be found [here](https://www.aplyca.com/en/blog/micro-frontends-what-are-they-and-when-to-use-them).


Micro Frontend app (MFE) built with runtime integration using Webpack 5's Module Federation Plugin. MFEs in packages directory are built with React (auth, container, marketing) and Vue solely for visual purposes (dashboard)
Basic app with simple functionality. Continuous Deployment to AWS with S3 bucket and CloudFront using Github actions and aws cli. [Deployment strategy common among MFEs like this](https://single-spa.js.org/docs/recommended-setup/#:~:text=Uploading%20production%20JavaScript%20bundles%20to%20a%20web%20server%20/%20CDN.%20It%20is%20encouraged%20to%20use%20a%20CDN%20such%20as%20AWS%20S3%20%2B%20Cloudfront%2C)


# How to Run locally

Clone project. In packages directory, navigate to each project and run, `npm install` and then `npm start`

# Demo of MFE web app and workflow
  

https://github.com/Step-henC/mfe/assets/98792412/cfec11ea-f388-4e03-9a89-ca241fd7656f


Courtesy of Stephen Grider MicroFrontends Udemy Course


# Future Directions
Create MFE, either convert this one or the [ecommerce app](https://github.com/Step-henC/ecommerce-mfe), to an mfe using [single-spa](https://single-spa.js.org/docs/recommended-setup/). Single-spa more or less uses a variation of code splitting to make
MFE's with disk space as the comparable monolith. Single-spa allows developers to deploy full app and hot-swap locally running mfe's to deployed code using devtools. Module federaion in single-spa can occur, but not
necessary.

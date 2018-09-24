// Register event listeners
(async function({ api, ...config }) {
//   [""Donald J. Trump""]
    console.log(api)
    console.log(config)
    document.querySelector('#load').addEventListener('click', load)
//     document.querySelector('article').addEventListener('scroll', handleScroll)
})(config)
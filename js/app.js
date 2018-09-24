// Register event listeners
(async function(config) {
    document.querySelector('#load').addEventListener('click', loadFromAddress)
    document.querySelector('article').addEventListener('scroll', handleScroll)

    var importDocument = document.querySelector('link[rel="import"]').import;
})(config)
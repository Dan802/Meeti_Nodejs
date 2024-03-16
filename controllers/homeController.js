/** homeController.js */
export function home (req, res) {
    res.render('home', {
        page: 'Home'
    })
}
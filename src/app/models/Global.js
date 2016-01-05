
module.exports = {
    apiEndpoint: window.location.hostname == 'localhost' ? 'http://localhost:8888/MikesMags/build/api/' : '/api/',
    magazines: [
        { payload: 0, text: 'All Magazines' },
        { payload: 12, text: 'Misc' },
        { payload: 1, text: 'Life' },
        { payload: 2, text: 'Woman\'s Day' },
        { payload: 3, text: 'Playboy' },
        { payload: 4, text: 'National Geographic' },
        { payload: 5, text: 'McCalls' },
        { payload: 6, text: 'Look' },
        { payload: 7, text: 'Family Circle' },
        { payload: 8, text: 'Leslies' },
        { payload: 9, text: 'New York Times' },
        { payload: 10, text: 'Daily News' },
        { payload: 11, text: 'Newsday' },
        { payload: 13, text: 'Cosmopolitan' }
    ],
    imageMap: {
        1: 'logo-life.jpg',
        2: 'logo-womens.jpg',
        3: 'logo-playboy.jpg',
        4: 'logo-natgeo.jpg',
        5: 'logo-mccalls.jpg',
        6: 'logo-look.jpg',
        7: 'logo-familycircle.jpg',
        8: 'logo-leslies.jpg',
        9: 'logo-nyt.jpg',
        10: 'logo-dailynews.jpg',
        11: 'logo-newsday.jpg',
        12: 'logo-misc.jpg',
        13: 'logo-cosmo.jpg'
    }
};
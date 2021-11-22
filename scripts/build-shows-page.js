let listConcerts = [
    {
        day: 'Mon',
        month: 'Sept',
        date: '06',
        year: '2021',
        venue: 'Ronald Lane',
        city: 'San Francisco',
        country: 'CA'
    },
    {
        day: 'Tue',
        month: 'Sept',
        date: '21',
        year: '2021',
        venue: 'Pier 3 East',
        city: 'San Francisco',
        country: 'CA'
    },
    {
        day: 'Fri',
        month: 'Oct',
        date: '15',
        year: '2021',
        venue: 'View Lounge',
        city: 'San Francisco',
        country: 'CA'
    },
    {
        day: 'Sat',
        month: 'Nov',
        date: '06',
        year: '2021',
        venue: 'Hyatt Agency',
        city: 'San Francisco',
        country: 'CA'
    },
    {
        day: 'Fri',
        month: 'Nov',
        date: '26',
        year: '2021',
        venue: 'Moscow Center',
        city: 'San Francisco',
        country: 'CA'
    },
    {
        day: 'Wed',
        month: 'Dec',
        date: '15',
        year: '2021',
        venue: 'Press Club',
        city: 'San Francisco',
        country: 'CA'
    }
]

let mainSection = document.querySelector('.main');
let showsSection = createSectionElement();
mainSection.appendChild(showsSection);

function createSectionElement() {

    let showsSection = document.createElement('section');
    showsSection.classList.add('shows');

    let showsTitle = document.createElement('h1');
    showsTitle.classList.add('shows__title');
    showsTitle.innerText = 'Shows';
    showsSection.appendChild(showsTitle);

    let showsContainerCards = createSectionShowsCards();
    showsSection.appendChild(showsContainerCards);

    return showsSection;
}

function createSectionShowsCards() {

    let showsContainerCards = document.createElement('div');
    showsContainerCards.classList.add('shows__cards');

    let containerTitle = createContainerTitle();
    showsContainerCards.appendChild(containerTitle);

    listConcerts.forEach((item) => {
        let showsCard = createCardElement(item);
        showsContainerCards.appendChild(showsCard);
    })

    return showsContainerCards;
}


function createContainerTitle() {

    let containerTitle = document.createElement('div');
    containerTitle.classList.add('shows__containerTitle');

    let titleCardDate = document.createElement('h4');
    titleCardDate.classList.add('shows__title-card-container');
    titleCardDate.innerText = 'DATE';
    containerTitle.appendChild(titleCardDate);

    let titleCardVenue = document.createElement('h4');
    titleCardVenue.classList.add('shows__title-card-container');
    titleCardVenue.innerText = 'VENUE';
    containerTitle.appendChild(titleCardVenue);

    let titleCardLocation = document.createElement('h4');
    titleCardLocation.classList.add('shows__title-card-container');
    titleCardLocation.innerText = 'LOCATION';
    containerTitle.appendChild(titleCardLocation);

    return containerTitle;
}

function createCardElement(item) {

    let showsCard = document.createElement('article');
    showsCard.classList.add('shows__card');

    let dateElement = createDateElement(item);
    showsCard.appendChild(dateElement);

    let venueElement = createVenueElement(item);
    showsCard.appendChild(venueElement);

    let locationElement = createLocationElement(item);
    showsCard.appendChild(locationElement);

    let buttonElement = createButtonElement();
    showsCard.appendChild(buttonElement);

    return showsCard;
}

function createDateElement(item) {

    let showsDate = document.createElement('div');
    showsDate.classList.add('shows__date');

    let titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'DATE';
    showsDate.appendChild(titleCard);

    let showsDetailDate = document.createElement('time');
    showsDetailDate.classList.add('shows__detail-date');
    showsDetailDate.innerText = item.day + ' ' + item.month + ' ' + item.date + ' ' + item.year;
    showsDate.appendChild(showsDetailDate);

    return showsDate;
}

function createVenueElement(item) {

    let showsVenue = document.createElement('div');
    showsVenue.classList.add('shows__venue');

    let titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'VENUE';
    showsVenue.appendChild(titleCard);

    let showsDetailVenue = document.createElement('p');
    showsDetailVenue.classList.add('shows__detail');
    showsDetailVenue.innerText = item.venue;
    showsVenue.appendChild(showsDetailVenue);

    return showsVenue;
}

function createLocationElement(item) {

    let showsLocation = document.createElement('div');
    showsLocation.classList.add('shows__location');

    let titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'LOCATION';
    showsLocation.appendChild(titleCard);

    let showsDetailLocation = document.createElement('p');
    showsDetailLocation.classList.add('shows__detail');
    showsDetailLocation.innerText = item.city + ',' + ' ' + item.country;
    showsLocation.appendChild(showsDetailLocation);

    return showsLocation;
}

function createButtonElement() {
    let showsButtonBuy = document.createElement('button');
    showsButtonBuy.classList.add('shows__button-buy');
    showsButtonBuy.innerText = 'BUY TICKETS';

    return showsButtonBuy;
}


// Click Event
let articleList = document.querySelectorAll('.shows__card');

articleList.forEach((article) => {
    article.addEventListener('click', () => {

        if (article.classList.contains('selected')) {
            article.classList.remove('selected');
        } else {
            article.classList.add('selected');
        }
    })
})




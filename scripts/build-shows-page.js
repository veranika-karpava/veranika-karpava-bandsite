const projectApiUrl = "https://project-1-api.herokuapp.com";
const apiKey = "7914ca5-c702-45f8-a052-61c3857a4dde";

const mainSection = document.querySelector('.main');


function createButtonElement() {
    const showsButtonBuy = document.createElement('button');
    showsButtonBuy.classList.add('shows__button-buy');
    showsButtonBuy.innerText = 'BUY TICKETS';

    return showsButtonBuy;
}

function createLocationElement(item) {

    const showsLocation = document.createElement('div');
    showsLocation.classList.add('shows__location');

    const titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'LOCATION';

    const showsDetailLocation = document.createElement('p');
    showsDetailLocation.classList.add('shows__detail');
    showsDetailLocation.innerText = item.location;

    showsLocation.append(titleCard, showsDetailLocation);

    return showsLocation;
}

function createVenueElement(item) {

    const showsVenue = document.createElement('div');
    showsVenue.classList.add('shows__venue');

    const titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'VENUE';

    const showsDetailVenue = document.createElement('p');
    showsDetailVenue.classList.add('shows__detail');
    showsDetailVenue.innerText = item.place;

    showsVenue.append(titleCard, showsDetailVenue);

    return showsVenue;
}

function createDateElement(item) {

    const showsDate = document.createElement('div');
    showsDate.classList.add('shows__date');

    const titleCard = document.createElement('h4');
    titleCard.classList.add('shows__title-card');
    titleCard.innerText = 'DATE';

    const showsDetailDate = document.createElement('time');
    showsDetailDate.classList.add('shows__detail-date');
    showsDetailDate.innerText = convertDate(item);

    function convertDate(item) {
        const date = new Date(Number(item.date)).toDateString("en-US", { timeZone: "UTC" });
        return date;
    }

    showsDate.append(titleCard, showsDetailDate);
    return showsDate;
}

function createCardElement(item) {

    const showsCard = document.createElement('article');
    showsCard.classList.add('shows__card');
    const dateElement = createDateElement(item);
    const venueElement = createVenueElement(item);
    const locationElement = createLocationElement(item);
    const buttonElement = createButtonElement();

    showsCard.append(dateElement, venueElement, locationElement, buttonElement);

    return showsCard;
}

function createContainerTitle() {

    const containerTitle = document.createElement('div');
    containerTitle.classList.add('shows__containerTitle');

    const titleCardDate = document.createElement('h4');
    titleCardDate.classList.add('shows__title-card-container');
    titleCardDate.innerText = 'DATE';

    const titleCardVenue = document.createElement('h4');
    titleCardVenue.classList.add('shows__title-card-container');
    titleCardVenue.innerText = 'VENUE';

    const titleCardLocation = document.createElement('h4');
    titleCardLocation.classList.add('shows__title-card-container');
    titleCardLocation.innerText = 'LOCATION';

    containerTitle.append(titleCardDate, titleCardVenue, titleCardLocation);

    return containerTitle;
}

const showsContainerCards = document.createElement('div');
showsContainerCards.classList.add('shows__cards');

const containerTitle = createContainerTitle();
showsContainerCards.append(containerTitle);

const showsElement = () => {
    axios
        .get(`${projectApiUrl}/showdates?api_key=${apiKey}`)
        .then((response) => {
            const showsSchedule = response.data;
            showsSchedule.sort((a, b) => (Number(a.date)) - (Number(b.date)))
            showsSchedule.forEach((showItem) => {
                const cardElement = createCardElement(showItem);
                showsContainerCards.append(cardElement);
            });
        })
        .catch((error) => console.log(error));
}

showsElement();

function createSectionElement() {

    const showsSection = document.createElement('section');
    showsSection.classList.add('shows');

    const showsTitle = document.createElement('h1');
    showsTitle.classList.add('shows__title');
    showsTitle.innerText = 'Shows';

    showsSection.append(showsTitle, showsContainerCards);

    return showsSection;
}

const showsSection = createSectionElement();
mainSection.appendChild(showsSection);

const showsCardsContainer = document.querySelector('.shows__cards');
const concertCard = showsCardsContainer.childNodes;

console.log(concertCard)

showsCardsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'shows__card') {
        concertCard.forEach(concert => {
            concert.classList.remove('selected');
        })
        e.target.classList.toggle('selected');
    }
})












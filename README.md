# Ticnician's Ticniques
*Developed By Ondre Williams - [See the app](http://ticnicians-ticniques.herokuapp.com/)*

Trading the markets profitably requires the deployment of well crafted strategies, consistent application of those strategies, and review of past trading activity to gain insights. Ticnician's Ticniques is a full stack web app for trader's to analyze the markets and document their strategies and trading plans with feature rich charting and intuitive annotation to maximize their strategic edge.

## The Tech
![The Tech](/readme-resources/pfrn-stack.gif)

### React / Redux / JavaScript Frontend
React, Redux, and Javascript power the frontend of Ticnician's Ticniques to achieve a fast, dynamic user experience allowing them keep up with the blazing pace of the markets. The integration of Tradingview charts offers best in class analysis, and 100% vanilla CSS provides custom, uniform styling in a dark theme that's easy on the eyes.

### Postgres / Flask / Python Backend
Postgres, Flask, and Python on the backend handle requests and serve data to the frontend of the application. PostgreSQL makes room for storage of rapidly increasing amounts of data, Flask allows for incremental growth in features, and any future features requiring heavy data analysis/processing are easily accomodated by Python's extensive data libraries.

## Market-watch in action
![Market-watch in action](/readme-resources/main-demo.gif)

## Tradeplans in action
![Tradeplans in action](/readme-resources/tradeplan-demo.gif)

#### Code for dynamic rendering of comment and form to edit comment
```js
const onEditButtonClick = (e, currVal, buttonsClass, messageClass, formClass) => {
  e.preventDefault();

  if(currVal)
    setCommentEdit(currVal);
  let divButtons = document.querySelector(buttonsClass);
  let divMessage = document.querySelector(messageClass);
  let divForm = document.querySelector(formClass);

  if(!editing){
    divButtons.style.display = "none";
    divMessage.style.display = "none";
    divForm.style.display = "block";
  } else {
    divButtons.style.display = "grid";
    divMessage.style.display = "block";
    divForm.style.display = "none";
  }
  setEditing(!editing);
}
```
#### Code for scrollable trading plans
```js
<div className="feed__container">
  <div className="tp-cntnr">
    <div className="feed__title">Community Trading Plans</div>
    <div className="feed__tradeplans">
      <div className="scroll">
        {displayTradeplans && displayTradeplans.map((tradeplan) => {
          return (
            <div className="feed__tradeplan-container">
              <div className="tradeplan__title">{tradeplan.title}</div>
              <div className="tradeplan__chart-buttons-cntnr">
                <img src={tradeplan.image} alt="tradeplan chart" className="feed__img" />
                <div className="tradeplan__buttons-cntnr">
                  <button onClick={() => onViewEditTP(tradeplan.id)} className="tradeplan__button tradeplan__view">
                    View
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
</div>
```

## Wrapping up
Ticnician's Ticniques is an app made for traders, by a trader. There were many features considered in the planning of this app. Ultimately, a decision was made to provide the features which I believed would make the greatest impact on users' consistency to begin with, and to build outward from there.

It has been incredibly rewarding to build this app, as I'm always learning and improving during the development of new sofware, and the technologies used continually inspired me with more ideas for future versions. All improvements to Ticnician's Ticniques will be documented here for any who'd like to follow the state of the app.

Thanks for checking out the app!

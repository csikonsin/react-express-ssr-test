import React from "react"
import { render, hydrate } from "react-dom"
import App from "../../src/App"

import style from "../css/index.less"
import transf from "../css/trans.less"


hydrate(<App/>, document.getElementById("app"))
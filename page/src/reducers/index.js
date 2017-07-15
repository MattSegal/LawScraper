import {caseFilterReducer} from './caseFilter'

// Lets us use pipe syntax eg. pipe(f,g,h)(x)
const _pipe = (f, g) => (...args) => g(f(...args))
const pipe = (...fns) => fns.reduce(_pipe)


export const reducer = (state,action) =>
    pipe(
        caseFilterReducer(action),
    )(state)

import {EngineersCostsType} from "../Types/state-types";

export const calcEffectiveCost = (engineersCosts: EngineersCostsType, resources: number[]) => {
    // доля дня в ГПР считается от 24 часов, поэтому значения часов умножаем на 3 - 8 часовой день, для камералки на 4 - считается, что это 6 часовой день
    const engineersCostsArray = [...engineersCosts.p.map(el => el * 3), ...engineersCosts.k.map(el => el * 4), ...engineersCosts.k.map(el => el * 4), ...engineersCosts.v.map(el => el * 3), ...engineersCosts.v.map(el => el * 3)]
    const pCost = engineersCostsArray.reduce((acc, cost, i) => {
        return acc + cost * resources[i]
    }, 0)
    return Math.round(pCost)
}
import {dateParse} from "@/utils/dateParse.js";

export const FunFilter = (array, query) =>{
    array = array.filter((item) => {
        return item.name?.toLowerCase().includes(query)
            || item.house?.toLowerCase().includes(query)
            || item.species?.toLowerCase().includes(query)
    })
    return array
}
export const FunFilters = (array, select, sort) => {
    let result = [...array];
    console.log(array, select, sort)
    if (!select) return result;
    array.sort((a, b) => {
        let valueA, valueB, hasB, hasA;

        switch (select) {
            case "name":
                valueA = a.name || "";
                valueB = b.name || "";
                hasA = !!a.name;
                hasB = !!b.name;
                break;
            case "happyBirthday":
                valueA = dateParse(a.dateOfBirth);
                console.log(valueA);
                valueB = dateParse(b.dateOfBirth);
                hasA = !!a.dateOfBirth;
                hasB = !!b.dateOfBirth;
                break;
            case "ancestry":
                valueA = a.ancestry || "";
                valueB = b.ancestry || "";
                hasA = !!a.ancestry;
                hasB = !!b.ancestry;
                break;
            default:
                return 0;
        }
        if (!hasA && hasB) return 1;
        if (hasA && !hasB) return -1;
        if (!hasA && !hasB) return 0;

        if (sort === "asc") {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    return array;
};
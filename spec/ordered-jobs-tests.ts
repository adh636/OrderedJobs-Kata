import {OrderedJobs} from "../src/ordered-jobs";
describe("ordered jobs", () => {
    let orderedJobs: OrderedJobs;
    beforeEach(() => {
        orderedJobs = new OrderedJobs();
    });
    it("should return empty string when no jobs", () => {
        expect(orderedJobs.order("")).toEqual("");
    });
});
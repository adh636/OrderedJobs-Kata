import {OrderedJobs} from "../src/ordered-jobs";

describe("ordered jobs", () => {

    let orderedJobs: OrderedJobs;
    beforeEach(() => {
        orderedJobs = new OrderedJobs();
    });

    it("should return empty string when no jobs", () => {
        expect(orderedJobs.order("")).toEqual("");
    });

    it("should order one job", () => {
        expect(orderedJobs.order("a => ")).toEqual("a");
    });

    it("should order multiple jobs", () => {
        expect(orderedJobs.order("a => \nb => \nc => ")).toEqual("abc");
    });

    it("should order multiple jobs with one dependency", () => {
        expect(orderedJobs.order("a => \nb => c\nc => ")).toEqual("acb");
    });

    it("should order multiple jobs with multiple dependencies", () => {
        expect(orderedJobs.order("a => \nb => c\nc => f\nd => a\ne => b\nf => ")).toEqual("afcdbe");
    });

    it("should return error for self dependency", () => {
        expect(orderedJobs.order("a => \nb => \nc => c")).toEqual("jobs can’t depend on themselves");
    });

    it("should return error for circular dependency", () => {
        expect(orderedJobs.order("a => \nb => c\nc => f\nd => a\ne => b\nf => b")).toEqual("jobs can’t have circular dependencies");
    });
});
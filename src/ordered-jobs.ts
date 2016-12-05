export class OrderedJobs {
    private jobArr: string[];
    private orderedJobs: string = "";

    order(jobs: string) {
        if (!jobs) return "";

        this.jobArr = jobs.split("\n");
        this.jobArr.forEach((job: string) => {
            this.orderedJobs += job[0];
        });

        return this.orderedJobs;
    }
}
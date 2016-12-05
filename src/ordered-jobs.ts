export class OrderedJobs {
    private jobArr: string[];
    private orderedJobs: string = "";
    private independentJobs: string[];
    private dependentJobs: string[];

    order(jobs: string) {
        if (!jobs) return "";

        this.splitAndFilterJobs(jobs);
        this.orderJobs();

        return this.orderedJobs;
    }

    private splitAndFilterJobs(jobs: string) {
        this.jobArr = jobs.split("\n");
        this.filterIndependentJobs();
        this.filterDependentJobs();
    }

    private filterDependentJobs() {
        this.dependentJobs = this.jobArr.filter((job: string) => {
            return job.length === 6;
        });
    }

    private filterIndependentJobs() {
        this.independentJobs = this.jobArr.filter((job: string) => {
            return job.length < 6;
        });
    }

    private orderJobs() {
        this.orderIndependentJobs();
        this.orderDependentJobs();
    }

    private orderIndependentJobs() {
        this.independentJobs.forEach((job: string) => {
            this.orderedJobs += job[0];
        });
    }

    private orderDependentJobs() {
        this.dependentJobs.forEach((job: string) => {
            this.orderedJobs += job[0];
        });
    }
}
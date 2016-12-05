export class OrderedJobs {
    private jobArr: string[];
    private orderedJobs: string = "";
    private independentJobs: string[];
    private dependentJobs: string[];

    order(jobs: string) {
        if (!jobs) return "";

        this.splitAndFilterJobs(jobs);
        this.orderJobs();
        this.checkForSelfDependency();

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
        let jobAdded: boolean = true;
        while(jobAdded) {
            let orderedJobsLength: number = this.orderedJobs.length;
            this.addNextJobIfPossible();
            if (this.noJobsAdded(orderedJobsLength)) jobAdded = false;
        }
    }

    private addNextJobIfPossible() {
        this.dependentJobs.forEach((job: string) => {
            if (this.jobNotOrderedAndDependencyOrdered(job)) {
                this.orderedJobs += job[0];
            }
        });
    }

    private jobNotOrderedAndDependencyOrdered(job: string) {
        return this.orderedJobs.indexOf(job[0]) === -1 && this.orderedJobs.indexOf(job[5]) !== -1;
    }

    private noJobsAdded(orderedJobsLength: number) {
        return orderedJobsLength === this.orderedJobs.length;
    }

    private checkForSelfDependency() {
        this.jobArr.forEach((job: string) => {
            if (job[0] === job[5]) {
                this.orderedJobs = "jobs can’t depend on themselves";
            }
        });
    }
}
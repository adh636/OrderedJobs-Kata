export class OrderedJobs {
    private orderedJobs: string = "";
    private jobArr: string[];
    private independentJobs: string[];
    private dependentJobs: string[];

    order(jobs: string): string {
        if (!jobs) return "";

        this.splitAndFilterJobs(jobs);
        this.orderJobs();
        this.checkForUnorderedJobs();

        return this.orderedJobs;
    }

    private splitAndFilterJobs(jobs: string): void {
        this.jobArr = jobs.split("\n");
        this.filterIndependentJobs();
        this.filterDependentJobs();
    }

    private filterDependentJobs(): void {
        this.dependentJobs = this.jobArr.filter((job: string) => {
            return job.length === 6;
        });
    }

    private filterIndependentJobs(): void {
        this.independentJobs = this.jobArr.filter((job: string) => {
            return job.length < 6;
        });
    }

    private orderJobs(): void {
        this.orderIndependentJobs();
        this.orderDependentJobs();
    }

    private orderIndependentJobs(): void {
        this.independentJobs.forEach((job: string) => {
            this.orderedJobs += job[0];
        });
    }

    private orderDependentJobs(): void {
        let jobAdded: boolean = true;
        while(jobAdded) {
            let orderedJobsLength: number = this.orderedJobs.length;
            this.addNextJobIfPossible();
            if (this.noJobsAdded(orderedJobsLength)) jobAdded = false;
        }
    }

    private addNextJobIfPossible(): void {
        this.dependentJobs.forEach((job: string) => {
            if (this.jobNotOrderedAndDependencyOrdered(job)) this.orderedJobs += job[0];
        });
    }

    private jobNotOrderedAndDependencyOrdered(job: string): boolean {
        return this.orderedJobs.indexOf(job[0]) === -1 && this.orderedJobs.indexOf(job[5]) !== -1;
    }

    private noJobsAdded(orderedJobsLength: number): boolean {
        return orderedJobsLength === this.orderedJobs.length;
    }

    private checkForUnorderedJobs(): void {
        if (this.unorderedJobs()) {
            this.checkForSelfDependency();
            this.checkForCircularDependency();
        }
    }

    private unorderedJobs(): boolean {
        return this.orderedJobs.length !== this.jobArr.length;
    }

    private checkForSelfDependency(): void {
        this.jobArr.forEach((job: string) => {
            if (job[0] === job[5]) this.orderedJobs = "jobs can’t depend on themselves";
        });
    }

    private checkForCircularDependency(): void {
        if (this.orderedJobs !== "jobs can’t depend on themselves") {
            this.orderedJobs = "jobs can’t have circular dependencies";
        }
    }
}
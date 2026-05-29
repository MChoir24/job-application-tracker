import connectDB from "../lib/db";
import "@/lib/models";
import { Board, Column, JobApplication } from "@/lib/models";

const USER_ID = "6929e34361b6f083d154859d";

const SAMPLE_JOBS = [
  // Wish List
  {
    company: "Vercel",
    position: "Frontend Engineer",
    location: "Remote",
    tags: ["Next.js", "TypeScript", "React"],
    description:
      "Build performant frontend experiences for developer tools and platforms",
    jobUrl: "https://example.com/jobs/101",
    salary: "$135k - $165k",
  },
  {
    company: "Canva",
    position: "UI Engineer",
    location: "Sydney, Australia",
    tags: ["Design Systems", "React", "Accessibility"],
    description:
      "Develop scalable UI components and improve design consistency",
    jobUrl: "https://example.com/jobs/102",
    salary: "$110k - $140k",
  },
  {
    company: "Tokopedia",
    position: "QA Automation Engineer",
    location: "Jakarta, Indonesia",
    tags: ["Cypress", "API Testing", "CI/CD"],
    description: "Automate testing pipelines for e-commerce web applications",
    jobUrl: "https://example.com/jobs/103",
    salary: "$45k - $70k",
  },

  // Applied
  {
    company: "Shopify",
    position: "Backend Developer",
    location: "Toronto, Canada",
    tags: ["Node.js", "GraphQL", "Redis"],
    description:
      "Create and maintain backend services powering merchant platforms",
    jobUrl: "https://example.com/jobs/104",
    salary: "$120k - $150k",
  },
  {
    company: "Grab",
    position: "Mobile Engineer",
    location: "Singapore",
    tags: ["Kotlin", "Android", "Jetpack Compose"],
    description:
      "Develop scalable mobile features for transportation and payments",
    jobUrl: "https://example.com/jobs/105",
    salary: "$90k - $125k",
  },
  {
    company: "Atlassian",
    position: "Product Designer",
    location: "Remote",
    tags: ["Figma", "UX Research", "Prototyping"],
    description:
      "Design collaborative workflows and user-centric product interfaces",
    jobUrl: "https://example.com/jobs/106",
    salary: "$100k - $130k",
  },
  {
    company: "Cloudflare",
    position: "Site Reliability Engineer",
    location: "Lisbon, Portugal",
    tags: ["Kubernetes", "Terraform", "Monitoring"],
    description:
      "Maintain global infrastructure reliability and observability systems",
    jobUrl: "https://example.com/jobs/107",
    salary: "$115k - $145k",
  },

  // Interviewing
  {
    company: "Notion",
    position: "Full Stack Engineer",
    location: "San Francisco, CA",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Build collaborative productivity tools used by teams worldwide",
    jobUrl: "https://example.com/jobs/108",
    salary: "$145k - $180k",
  },
  {
    company: "Airbnb",
    position: "Data Analyst",
    location: "Remote",
    tags: ["SQL", "Python", "Looker"],
    description:
      "Analyze marketplace trends and deliver insights for business decisions",
    jobUrl: "https://example.com/jobs/109",
    salary: "$105k - $135k",
  },
  {
    company: "Duolingo",
    position: "iOS Developer",
    location: "Pittsburgh, PA",
    tags: ["Swift", "UIKit", "Mobile UX"],
    description:
      "Create engaging educational mobile experiences for language learners",
    jobUrl: "https://example.com/jobs/110",
    salary: "$125k - $155k",
  },

  // Offer
  {
    company: "Datadog",
    position: "Platform Engineer",
    location: "New York, NY",
    tags: ["AWS", "Go", "Observability"],
    description:
      "Build internal tooling and improve cloud infrastructure performance",
    jobUrl: "https://example.com/jobs/111",
    salary: "$140k - $175k",
  },
  {
    company: "Figma",
    position: "UX Designer",
    location: "Berlin, Germany",
    tags: ["Design Systems", "Wireframing", "Collaboration"],
    description: "Design intuitive workflows for collaborative design software",
    jobUrl: "https://example.com/jobs/112",
    salary: "$95k - $125k",
  },

  // Rejected
  {
    company: "Intelix",
    position: "Junior Scrum Master",
    location: "Dublin, Ireland",
    tags: ["Agile", "JIRA", "Team Coordination"],
    description:
      "Coordinate agile ceremonies and support software delivery teams",
    jobUrl: "https://example.com/jobs/113",
    salary: "$65k - $80k",
  },
  {
    company: "BrightPath",
    position: "Manual QA Tester",
    location: "Austin, TX",
    tags: ["Testing", "Bug Tracking", "Regression Testing"],
    description: "Execute manual test cases and report software quality issues",
    jobUrl: "https://example.com/jobs/114",
    salary: "$60k - $78k",
  },
  {
    company: "BlueMetric",
    position: "Business Intelligence Analyst",
    location: "London, UK",
    tags: ["Power BI", "SQL", "Data Visualization"],
    description: "Create dashboards and reports to support strategic planning",
    jobUrl: "https://example.com/jobs/115",
    salary: "$85k - $105k",
  },
];

async function seed() {
  if (!USER_ID) {
    console.error("❌ Error: SEED_USER_ID environment variable is required");
    console.log("Usage: SEED_USER_ID=your-user-id npm run seed");
    process.exit(1);
  }

  try {
    console.log("🌱 Starting seed process...");
    console.log(`📋 Seeding data for user ID: ${USER_ID}`);

    await connectDB();
    console.log("✅ Connected to database");

    // Find the user's board
    let board = await Board.findOne({ userId: USER_ID, name: "Job Hunt" });

    if (!board) {
      console.log("⚠️  Board not found. Creating board...");
      const { initializeUserBoard } = await import("../lib/init-user-board");
      board = await initializeUserBoard(USER_ID);
      console.log("✅ Board created");
    } else {
      console.log("✅ Board found");
    }

    // Get all columns
    const columns = await Column.find({ boardId: board._id }).sort({
      order: 1,
    });
    console.log(`✅ Found ${columns.length} columns`);

    if (columns.length === 0) {
      console.error(
        "❌ No columns found. Please ensure the board has default columns.",
      );
      process.exit(1);
    }

    // Map column names to column IDs
    const columnMap: Record<string, string> = {};
    columns.forEach((col) => {
      columnMap[col.name] = col._id.toString();
    });

    // Clear existing job applications for this user
    const existingJobs = await JobApplication.find({ userId: USER_ID });
    if (existingJobs.length > 0) {
      console.log(
        `🗑️  Deleting ${existingJobs.length} existing job applications...`,
      );
      await JobApplication.deleteMany({ userId: USER_ID });

      // Clear job applications from columns
      for (const column of columns) {
        column.jobApplications = [];
        await column.save();
      }
    }

    // Distribute jobs across columns
    const jobsByColumn: Record<string, typeof SAMPLE_JOBS> = {
      "Wish List": SAMPLE_JOBS.slice(0, 3),
      Applied: SAMPLE_JOBS.slice(3, 7),
      Interviewing: SAMPLE_JOBS.slice(7, 10),
      Offer: SAMPLE_JOBS.slice(10, 12),
      Rejected: SAMPLE_JOBS.slice(12, 15),
    };

    let totalCreated = 0;

    for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
      const columnId = columnMap[columnName];
      if (!columnId) {
        console.warn(`⚠️  Column "${columnName}" not found, skipping...`);
        continue;
      }

      const column = columns.find((c) => c.name === columnName);
      if (!column) continue;

      for (let i = 0; i < jobs.length; i++) {
        const jobData = jobs[i];
        const jobApplication = await JobApplication.create({
          company: jobData.company,
          position: jobData.position,
          location: jobData.location,
          tags: jobData.tags,
          description: jobData.description,
          jobUrl: jobData.jobUrl,
          salary: jobData.salary,
          columnId: columnId,
          boardId: board._id,
          userId: USER_ID,
          status: columnName.toLowerCase().replace(" ", "-"),
          order: i,
        });

        column.jobApplications.push(jobApplication._id);
        totalCreated++;
      }

      await column.save();
      console.log(`✅ Added ${jobs.length} jobs to "${columnName}" column`);
    }

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`📊 Created ${totalCreated} job applications`);
    console.log(`📋 Board: ${board.name}`);
    console.log(`👤 User ID: ${USER_ID}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

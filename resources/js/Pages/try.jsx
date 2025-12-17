import React, { useState } from "react";

import {
    FaDownload,
    FaBriefcase,
    FaCheck,
    FaClock,
    FaEnvelope,
    FaIndianRupeeSign,
    FaCalendar,
} from "react-icons/fa6";

import CardNav from "@/Components/CardNav";

import GradientText from "@/Components/GradientText";

import DropdownDays from "@/Components/Dropdown";

import { RainbowButton } from "@/Components/rainbow-button";

import SparkLine from "@/Components/SparkLine";

import ApplicationChart from "@/Components/ApplicationChart";

import ApplicationTimeline from "@/Components/ApplicationTimeline";

import SuccessrateByCompany from "@/Components/ApplicationSuccessrate";

import SalaryDistributionChart from "@/Components/SalaryDistribution";

import ApplicationResource from "@/Components/ApplicationSources";

import MonthlyVolume from "@/Components/MonthlyVolume";

import ShinyText from "@/Components/ShinyText";

import DarkVeil from "@/Components/DarkVeil";

// Days Days

const timesTypeOptions = [
    { label: "All Time", value: "all" },

    { label: "Last 7 days", value: "7" },

    { label: "Last 30 days", value: "30" },

    { label: "Last 3 months", value: "90" },
];

//nav items

const Navitems = [
    {
        label: "Dashboard",

        bgColor: "#0D0716",

        textColor: "#fff",

        links: [
            { label: "Overview", ariaLabel: "Overview" },

            { label: "Applications", ariaLabel: "Applications" },

            { label: "Add New", ariaLabel: "Create application" },
        ],
    },

    {
        label: "Tools",

        bgColor: "#170D27",

        textColor: "#fff",

        links: [
            { label: "Analytics", ariaLabel: "charts & insights" },

            { label: "Interview Prep", ariaLabel: "questions" },

            { label: "Resume Scorer", ariaLabel: "ATS optimizer" },
        ],
    },

    {
        label: "Account",

        bgColor: "#271E37",

        textColor: "#fff",

        links: [
            { label: "My Profile", ariaLabel: "edit details" },

            { label: "Settings", ariaLabel: "preferences" },

            { label: "Logout", ariaLabel: "sign out" },
        ],
    },
];

export default function AnalyticsDashboard() {
    const [filterTimes, setFilterTimes] = useState("");

    return (
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-12">
            <main className="mt-20">
                <div className="absolute inset-0 opacity-70 mix-blend-screen">
                    <div
                        style={{
                            width: "100%",
                            height: "1000px",
                            position: "relative",
                        }}
                    >
                        <DarkVeil />
                    </div>
                </div>

                <header className="">
                    <CardNav
                        logoAlt="Company Logo"
                        items={Navitems}
                        baseColor="rgba(0, 0, 0, 0.3)"
                        menuColor="#000"
                        buttonBgColor="#111"
                        buttonTextColor="#fff"
                        ease="power3.out"
                    />
                </header>

                <header className="p-6 sm:p-8 ">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div className="flex items-center space-x-5">
                            <div>
                                <div>
                                    <GradientText
                                        colors={[
                                            "#8660fa",
                                            "#a855f7",
                                            "#8400ff",
                                            "#a855f7",
                                            "#8660fa",
                                        ]}
                                        animationSpeed={8}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <h1 className="text-4xl font-extrabold mb-2">
                                            Analytics & Insights
                                        </h1>
                                    </GradientText>
                                </div>

                                <p className="text-lg font-medium text-purple-100">
                                    Real-time analytics that power informed,
                                    confident decisions.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                            <div className="w-[200px] h-8">
                                <DropdownDays
                                    options={timesTypeOptions}
                                    selected={
                                        timesTypeOptions.find(
                                            (opt) => opt.value === filterTimes
                                        ) || timesTypeOptions[0]
                                    }
                                    onSelect={(val) => {
                                        const value =
                                            val.value !== undefined
                                                ? val.value
                                                : val;

                                        setFilterTimes(value);
                                    }}
                                    placeholder="All Time"
                                    className="max-sm:text-xs "
                                />
                            </div>

                            <div>
                                <RainbowButton
                                    className="mt-4 max-sm:text-xs max-sm:p-2"
                                    variant=""
                                >
                                    <FaDownload className="text-gray-200" />
                                    Export
                                </RainbowButton>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-[#060010] border border-[#392e4e] rounded-lg p-4 relative mx-4">
                    <div className="grid grid-cols-6 grid-rows-2 gap-4 mb-4">
                        <div className="col-span-2 bg-[#0D0716] border border-[#392e4e] rounded-xl py-2 px-2 grid place-items-center">
                            <div className="flex justify-around items-center gap-4 w-full">
                                <div>
                                    <h3 className="text-gray-300 font-medium text-lg mb-4">
                                        Success Rate
                                    </h3>

                                    <GradientText
                                        colors={[
                                            "#8660fa",
                                            "#a855f7",
                                            "#8400ff",
                                            "#a855f7",
                                            "#8660fa",
                                        ]}
                                        animationSpeed={10}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <p className="text-5xl font-extrabold mb-1">
                                            99%
                                        </p>
                                    </GradientText>
                                </div>

                                <div>
                                    <SparkLine
                                        data={[
                                            200, 24, 220, 260, 240, 380, 100,
                                            240, 280, 240,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 col-start-3 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center">
                            <div className="flex justify-around items-center gap-4">
                                <div>
                                    <h3 className="text-gray-200 font-medium text-lg mb-4">
                                        Average Response Time
                                    </h3>

                                    <GradientText
                                        colors={[
                                            "#8660fa",
                                            "#a855f7",
                                            "#8400ff",
                                            "#a855f7",
                                            "#8660fa",
                                        ]}
                                        animationSpeed={10}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <p className="text-5xl font-extrabold mb-2">
                                            5 days
                                        </p>
                                    </GradientText>
                                </div>

                                <div>
                                    <SparkLine
                                        data={[
                                            220, 140, 280, 330, 260, 370, 190,
                                            230, 350, 300,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 col-start-1 row-start-2 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center ">
                            <div className="flex justify-around items-center gap-4 w-full">
                                <div>
                                    <h3 className="text-gray-300 font-medium text-lg mb-4">
                                        Interview Conversion
                                    </h3>

                                    <GradientText
                                        colors={[
                                            "#8660fa",
                                            "#a855f7",
                                            "#8400ff",
                                            "#a855f7",
                                            "#8660fa",
                                        ]}
                                        animationSpeed={10}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <p className="text-5xl font-extrabold mb-1">
                                            37.5%
                                        </p>
                                    </GradientText>
                                </div>

                                <div>
                                    <SparkLine
                                        data={[
                                            160, 200, 250, 300, 280, 360, 240,
                                            320, 210, 290,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 col-start-3 row-start-2 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center">
                            <div className="flex justify-around items-center gap-4">
                                <div>
                                    <h3 className="text-gray-300 font-medium text-xl mb-4">
                                        Active Applications
                                    </h3>

                                    <GradientText
                                        colors={[
                                            "#8660fa",
                                            "#a855f7",
                                            "#8400ff",
                                            "#a855f7",
                                            "#8660fa",
                                        ]}
                                        animationSpeed={10}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <p className="text-5xl font-extrabold mb-1">
                                            100
                                        </p>
                                    </GradientText>
                                </div>

                                <div>
                                    <SparkLine
                                        data={[
                                            130, 260, 230, 310, 200, 340, 260,
                                            380, 240, 300,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 row-span-2 col-start-5 row-start-1 bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl">
                            <h1 className="mb-1"></h1>

                            <div>
                                <ApplicationChart />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <ApplicationTimeline />

                        <SuccessrateByCompany />
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-[70%] bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl">
                            <SalaryDistributionChart />
                        </div>

                        <div className="w-[30%] bg-[#0D0716] border border-[#392e4e] rounded-xl pt-4">
                            <ApplicationResource />
                        </div>
                    </div>

                    <div className="mb-4">
                        <MonthlyVolume />
                    </div>

                    <div className="w-full">
                        <div className="flex gap-2 w-full">
                            {/* best apply date */}

                            <div className="bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%]">
                                <h1>
                                    <ShinyText
                                        text="Best Days to Apply"
                                        disabled={false}
                                        speed={3}
                                        className="text-gray-300 font-medium text-md"
                                    />
                                </h1>

                                <div className="flex justify-between ">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Monday
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    25%
                                                </h1>
                                            </GradientText>
                                        </p>

                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Tuesday
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    70%
                                                </h1>
                                            </GradientText>
                                        </p>
                                    </div>

                                    <div className="">
                                        <SparkLine
                                            data={[
                                                220, 140, 280, 330, 260, 370,
                                                190, 230, 350, 300,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* on demand skills */}

                            <div className="bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex justify-center items-center gap-2 w-[25%]">
                                <div>
                                    <h1>
                                        <ShinyText
                                            text="Top Skills in Demand"
                                            disabled={false}
                                            speed={3}
                                            className="text-gray-300 font-medium text-md mb-2"
                                        />
                                    </h1>

                                    <div className="flex flex-wrap gap-2 my-2">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            React
                                        </span>

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            JavaScript
                                        </span>

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            TypeScript
                                        </span>

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            Tailwind CSS
                                        </span>

                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            Node.js
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Industry Response Rate */}

                            <div className="bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%]">
                                <h1>
                                    <ShinyText
                                        text="Industry Response Rate"
                                        disabled={false}
                                        speed={3}
                                        className="text-gray-300 font-medium text-md"
                                    />
                                </h1>

                                <div className="flex justify-between ">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Tech
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    50%
                                                </h1>
                                            </GradientText>
                                        </p>

                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Software
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    90%
                                                </h1>
                                            </GradientText>
                                        </p>
                                    </div>

                                    <div className="">
                                        <SparkLine
                                            data={[
                                                220, 140, 280, 330, 260, 370,
                                                190, 230, 350, 300,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* avarage interview rounds */}

                            <div className="bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%]">
                                <h1>
                                    <ShinyText
                                        text="Average Interview Rounds"
                                        disabled={false}
                                        speed={3}
                                        className="text-gray-300 font-medium text-md"
                                    />
                                </h1>

                                <div className="flex justify-between ">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Tech
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    3.5
                                                </h1>
                                            </GradientText>
                                        </p>

                                        <p className="font-bold text-md mb-1 flex items-center gap-2">
                                            Startups
                                            <GradientText
                                                colors={[
                                                    "#8660fa",
                                                    "#a855f7",
                                                    "#8400ff",
                                                    "#a855f7",
                                                    "#8660fa",
                                                ]}
                                                animationSpeed={10}
                                                showBorder={false}
                                                className="custom-class"
                                            >
                                                <h1 className="text-lg font-extrabold">
                                                    2.8
                                                </h1>
                                            </GradientText>
                                        </p>
                                    </div>

                                    <div className="">
                                        <SparkLine
                                            data={[
                                                220, 140, 280, 330, 260, 370,
                                                190, 230, 350, 300,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COMPANY COMPARISON TABLE */}

                    <div className="mt-6 flex gap-4 w-full">
                        <section
                            aria-labelledby="comparison-title"
                            className="w-[70%]"
                        >
                            <h2
                                id="comparison-title"
                                className="text-xl font-bold mb-4"
                            >
                                Company Comparison
                            </h2>

                            <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl overflow-hidden overflow-y-auto max-h-[250px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-800 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <table className="table-auto w-full">
                                    <thead className="bg-[#392e4e] text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                                        <tr>
                                            <th className="p-4">
                                                Company Name
                                            </th>

                                            <th className="p-4">Apps Sent</th>

                                            <th className="p-4">
                                                Response Rate
                                            </th>

                                            <th className="p-4">
                                                Average Salary
                                            </th>

                                            <th className="p-4">
                                                Success Rate
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#392e4e]">
                                        <tr className="hover:bg-[#392e4e] transition-colors">
                                            <td className="p-4 font-medium text-white">
                                                TechCorp Solutions
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                8
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                50%
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                $130,000
                                            </td>

                                            <td className="p-4 text-purple-600 font-medium">
                                                12.5%
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-[#392e4e] transition-colors">
                                            <td className="p-4 font-medium text-white">
                                                DataSys Inc.
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                12
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                25%
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                $125,000
                                            </td>

                                            <td className="p-4 text-purple-600 font-medium">
                                                8.3%
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-[#392e4e] transition-colors">
                                            <td className="p-4 font-medium text-white">
                                                FinTech Global
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                5
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                20%
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                $140,000
                                            </td>

                                            <td className="p-4 text-red-500 font-medium">
                                                0%
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-[#392e4e] transition-colors">
                                            <td className="p-4 font-medium text-white">
                                                QuantumLeap AI
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                2
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                100%
                                            </td>

                                            <td className="p-4 text-gray-200">
                                                $150,000
                                            </td>

                                            <td className="p-4 text-purple-600 font-medium">
                                                50.0%
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="w-[30%]">
                            <h2 className="text-xl font-bold mb-4">
                                Recommendations
                            </h2>

                            <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl p-4 overflow-y-auto h-[250px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-800 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl p-4 mb-4">
                                    <h2>Apply More on Mondays</h2>
                                </div>

                                <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl p-4 mb-4">
                                    <h2>Focus on Remote Jobs</h2>
                                </div>

                                <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl p-4 mb-4">
                                    <h2>Update Your Skills (React, AWS)</h2>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

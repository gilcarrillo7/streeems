import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import {
	selectError,
	selectStatus,
	selectPieChart,
} from "../../features/publications/publicationsSlice";
import { useAppSelector } from "../../hooks";
import Loader from "../shared/Loader";

ChartJS.register(ArcElement, ChartDataLabels);

const CircleChart = () => {
	const pieData = useAppSelector(selectPieChart);
	const status = useAppSelector(selectStatus);
	const error = useAppSelector(selectError);

	const data = {
		labels: pieData.dossiers,
		datasets: [
			{
				label: "",
				data: pieData.percents,
				backgroundColor: pieData.colors,
				borderWidth: 0,
				datalabels: {
					color: "white",
					font: {
						weight: "bold",
						size: "20px",
					},
					formatter: function (value: number) {
						return value + "%";
					},
				},
			},
		],
	};

	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<>
					{error && <p className="text-error text-xl text-center">{error}</p>}
					{!error && (
						<div className="w-full flex flex-col md:flex-row gap-8 items-center">
							<div className="grid grid-cols-2 gap-x-6 md:block md:absolute md:w-56 break-all">
								{pieData.dossiers.map((dossier, i) => (
									<div className="relative">
										<div
											className="rounded-full w-8 h-8 absolute left-0 top-1/2 -translate-y-1/2"
											style={{ backgroundColor: pieData.colors[i] }}
										></div>
										<p className="ml-3 py-3 pl-8">{dossier}</p>
									</div>
								))}
							</div>
							<div className="w-full md:pl-64">
								<Pie data={data} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default CircleChart;

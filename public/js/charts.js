$(document).ready(function() 
{
	let weightGraphContext = $("#weightGraph");
	
	let weightGraphData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		
		datasets: [{
			label: "Dataset One",
			fill: false,
			
			backgroundColor: pattern.draw("diagonal", ColorsEnum.RED),
			borderColor: pattern.draw("diagonal", ColorsEnum.RED),
			
			data: [
				200,
				210,
				212,
				207,
				202,
				198,
				191,
			]
		}, 
		{
			label: "Dataset Two",
			fill: false,
			
			backgroundColor: pattern.draw("line-vertical", ColorsEnum.BLUE),
			borderColor: pattern.draw("line-vertical", ColorsEnum.BLUE),
			
			data: [
				150,
				146,
				144,
				147,
				149,
				152,
				155,
			]
		}]
	};
	
	let weightGraphOptions = {
		responsive: true,
		
		title: {
			display: true,
			text: "Bean's Test Graph"
		},
		
		tooltips: {
			mode: "index",
			intersect: false
		},
		
		hover: {
			mode: "nearest",
			intersect: true
		},
		
		scales: {
			x: {
				display: true,
				
				scaleLabel: {
					display: true,
					labelString: 'Month'
				}
			},
			
			y: {
				display: true,
				
				scaleLabel: {
					display: true,
					labelString: 'Value'
				}
			}
		}
	};
	
	let weightGraph = new Chart(weightGraphContext, {
		type: "line",
		data: weightGraphData,
		options: weightGraphOptions
	});
});

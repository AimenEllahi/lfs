import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import output from "./output.json";
ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend
);

function App() {
  let count = { male: 0, female: 0, other: 0 };
  let yearCounts = [];

  let genders = { male: [], female: [], other: [] };
  const filters = {
    male: { articleCodes: [], articles: [] },
    female: { articleCodes: [], articles: [] },
    other: { articleCodes: [], articles: [] },
  };

  output.map((item) => {
    const year = item.Maand;

    // Check if the year already exists in yearCounts; if not, initialize it to 1, otherwise increment the count
    if (yearCounts[year]) {
      yearCounts[year]++;
    } else {
      yearCounts[year] = 1;
    }
    if (item.GENDER.toLowerCase() === "male") {
      count.male += 1;
      genders.male.push(item);
      if (filters.male.articleCodes.includes(item.Artikelcode)) {
        filters.male.articles.map((article) => {
          if (article.code === item.Artikelcode) {
            article.count += 1;
          }
        });
      } else {
        filters.male.articleCodes.push(item.Artikelcode);
        filters.male.articles.push({ code: item.Artikelcode, count: 1 });
      }
    } else if (item.GENDER.toLowerCase() === "female") {
      count.female += 1;
      genders.female.push(item);
      if (filters.female.articleCodes.includes(item.Artikelcode)) {
        filters.female.articles.map((article) => {
          if (article.code === item.Artikelcode) {
            article.count += 1;
          }
        });
      } else {
        filters.female.articleCodes.push(item.Artikelcode);
        filters.female.articles.push({ code: item.Artikelcode, count: 1 });
      }
    } else {
      count.other += 1;
      genders.other.push(item);
      if (filters.other.articleCodes.includes(item.Artikelcode)) {
        filters.other.articles.map((article) => {
          if (article.code === item.Artikelcode) {
            article.count += 1;
          }
        });
      } else {
        filters.other.articleCodes.push(item.Artikelcode);
        filters.other.articles.push({ code: item.Artikelcode, count: 1 });
      }
    }
  });

  let maleCodes = filters.male.articles.sort((a, b) => b.count - a.count);
  let femaleCodes = filters.female.articles.sort((a, b) => b.count - a.count);
  let otherCodes = filters.other.articles.sort((a, b) => b.count - a.count);

  console.log(maleCodes);

  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "# of Votes",
        data: [count.male, count.female, count.other],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Each Month in past 3 years",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];
  const lineData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Perfume Sales Dataset",
        data: [
          yearCounts.jan,
          yearCounts.feb,
          yearCounts.mrt,
          yearCounts.apr,
          yearCounts.mei,
          yearCounts.jun,
          yearCounts.jul,
          yearCounts.aug,
          yearCounts.sep,
          yearCounts.okt,
          yearCounts.nov,
          yearCounts.dec,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <div className='flex justify-between p-10'>
        <Pie
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Genders",
              },
            },
          }}
          className='max-h-[50vh] max-w-[40%]'
          data={data}
        />
        <Line
          className='max-h-[50vh] max-w-[50%]'
          options={options}
          data={lineData}
        />
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Serial Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Male
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Female
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Other
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {
              // add 10 elements to the array
              Array.from({ length: 10 }).map((_, index) => {
                console.log(maleCodes[index]);
                return (
                  <tr key={index}>
                    <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {maleCodes[index].code}( {maleCodes[index].count})
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {femaleCodes[index].code}( {femaleCodes[index].count})
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {otherCodes[index].code}( {otherCodes[index].count})
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

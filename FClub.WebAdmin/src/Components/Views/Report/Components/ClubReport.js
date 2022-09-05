import { Card } from "@mui/material";
import { Bar } from "react-chartjs-2";

const ClubReport = ({ clubName, value }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Bar
        data={{
          labels: clubName,
          datasets: [
            {
              label: "# of members",
              data: value,
              backgroundColor: "#DBF2F2",
              borderColor: "#4BC0C0",
              hoverBorderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              ticks: {
                stepSize: 1,
              },
            },
          },
          plugins: {
            title: {
              text: "Club with the most members",
              display: true,
              fullSize: true,
            },
          },
        }}
        height={400}
        width={600}
      />
    </Card>
  );
};

export default ClubReport;

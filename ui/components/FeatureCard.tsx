import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        transition: "0.3s",
        flexDirection: "column",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom color="primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

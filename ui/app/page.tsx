import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import Link from "@/components/Link";
import FeatureCard from "@/components/FeatureCard";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Bun",
    description: "Fast JavaScript runtime for lightning-quick development.",
  },
  {
    title: "Material UI",
    description: "Beautiful, accessible, and customizable React components.",
  },
  {
    title: "BetterAuth",
    description: "Secure and flexible authentication handling.",
  },
  {
    title: "Drizzle ORM",
    description: "Lightweight and type-safe database interaction.",
  },
  {
    title: "Django",
    description: "Robust backend for complex data modeling and logic.",
  },
  {
    title: "Kysely",
    description: "Type-safe SQL query builder used by BetterAuth.",
  },
];

export default async function Page() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 8, md: 12 },
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Djanxt
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ opacity: 0.9 }}>
            Django + Next.js + BetterAuth
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: "600px", mx: "auto", opacity: 0.8 }}>
            The ultimate boilerplate for building modern, scalable web applications with a powerful backend and a
            dynamic frontend.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            href="/signup"
            sx={{ fontWeight: "bold" }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Powerhouse Stack
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Architecture & Problem Solving */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                The Problem
              </Typography>
              <Typography variant="body1" component="p">
                One of the key features of BetterAuth is how it manages the databases for you. Unfortunately, the same
                goes for Django. Even more unfortunately, they use wildly different database schemas for authentication.
              </Typography>
              <Typography variant="body1" component="p">
                What&apos;s the solution? <strong>A single source of truth.</strong>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    The Solution: Shared Database
                  </Typography>
                  <Typography variant="body2" component="p">
                    Since Next.js is the frontend framework, we use Django to manage the databases. The models are
                    defined in Django, and BetterAuth shares the <code>user_user</code> table.
                  </Typography>
                  <Typography variant="body2" component="p">
                    This ensures seamless synchronization between your robust Django backend and your dynamic Next.js
                    frontend.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Getting Started Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Build?
        </Typography>
        <Typography variant="body1" component="p" color="text.secondary">
          Dive into the code and start building your next big idea with Djanxt.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            size="large"
            component="a"
            target="_blank"
            variant="outlined"
            href="https://github.com/mentix02/djanxt"
          >
            View on GitHub
          </Button>
          <Button variant="contained" size="large" component={Link} href="/login">
            Log In
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

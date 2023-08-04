import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Autocomplete,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import { useNavigate, useRouter } from "@tanstack/router";
import { IconSearch } from "@tabler/icons-react";
import { useQueryClient } from "react-query";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles(theme => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  logo: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      marginRight: 8,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderResponsiveProps {
  links?: { link: string; label: string }[];
}

export function HeaderBooks({ links }: HeaderResponsiveProps) {
  const router = useRouter();
  const navigation = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState<any>(router.state.location.pathname);
  const { classes, cx } = useStyles();
  const queryClient = useQueryClient();

  const items: any = links?.map(link => (
    <a
      key={link?.label}
      href={link?.link}
      className={cx(classes.link, { [classes.linkActive]: active === link?.link })}
      onClick={async event => {
        event.preventDefault();
        setActive(link?.link);
        navigation({ to: link?.link, search: {}, params: {} });
        close();
      }}
    >
      {link?.label}
    </a>
  ));

  const handleFindBooks = async (values: any) => {
    await navigation({ to: "/books", search: { q: values } });
    await queryClient.invalidateQueries("listBooks");
  };

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container mx={0} maw={"100%"} className={classes.header}>
        <Group className={classes.search}>
          <MantineLogo className={classes.logo} size={28} onClick={() => navigation({ to: "/" })} />
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
            onKeyUp={event => {
              if (event.key === "Enter") {
                handleFindBooks(event.currentTarget.value);
                event.currentTarget.value = ""
              }
            }}
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {styles => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

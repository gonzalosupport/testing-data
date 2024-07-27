import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Button,
  Chip,
  ColorPaletteProp,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/joy';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ProductType } from '@app/hooks/useProduct';

import { appUrl } from '@chaindesk/lib/config';
import { AppStatus, RouteNames } from '@chaindesk/lib/types';
import DarkModeToggle from '@chaindesk/ui/DarkModeToggle';

import AccountCard from '../AccountCard';
import UserMenu from '../UserMenu';

export type AppLink =
  | {
      label: string;
      route: RouteNames;
      icon: JSX.Element;
      active: boolean;
      isNew: boolean;
      isExperimental?: undefined;
    }
  | {
      label: string;
      route: RouteNames;
      icon: JSX.Element;
      active: boolean;
      isExperimental: boolean;
      isNew: boolean;
    };

function NavigationLink(props: {
  href: string;
  target?: string;
  active?: boolean;
  icon?: React.ReactNode;
  label?: string | React.ReactElement;
  isExperimental?: boolean;
  isNew?: boolean;
}) {
  return (
    <Link key={props.href} href={props.href} target={props?.target}>
      <ListItem>
        <ListItemButton
          variant={props.active ? 'soft' : 'plain'}
          color={props.active ? 'primary' : 'neutral'}
        >
          <ListItemDecorator
            sx={{ color: props.active ? 'inherit' : 'neutral.500' }}
          >
            {props.icon}
          </ListItemDecorator>
          <ListItemContent>{props.label}</ListItemContent>

          <Stack direction="row" alignItems={'center'} sx={{ ml: 'auto' }}>
            {props.isNew && (
              <Chip
                className="text-white bg-gradient-to-r from-orange-500 via-red-500 to-red-500"
                size="sm"
              >
                new
              </Chip>
            )}

            {props.isExperimental && (
              <Chip
                className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                size="sm"
              >
                beta
              </Chip>
            )}
          </Stack>
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default function ExpandedNavigation({
  product,
  appLinks,
  settingLinks,
  docLinks,
  publicRuntimeConfig,
  status,
}: {
  product: ProductType;
  appLinks: AppLink[];
  settingLinks: AppLink[];
  docLinks: AppLink[];
  status: AppStatus | undefined;
  publicRuntimeConfig: Record<string, unknown> & { version?: string };
}) {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <>
      <Stack
        className="h-full px-4 overflow-y-auto"
        bgcolor="background.surface"
      >
        <List size="sm" sx={{ '--ListItem-radius': '8px' }}>
          <Stack
            direction="row"
            width="100%"
            gap={1}
            justifyContent="space-between"
            justifyItems="center"
            paddingTop={1}
            paddingBottom={1}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <div className="relative w-12 h-12 mt-[0.5px] flex justify-center ">
                <Image layout="fill" src="/logo.png" alt="ChatsappAI" />
              </div>
              <Typography level="title-md">ChatsappAI</Typography>
            </Stack>
            <DarkModeToggle variant="plain" color="neutral" />
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <ListItem nested>
            {/* {!!session?.user?.id && (
              <Head>
                <script
                  id="chatbox"
                  type="module"
                  dangerouslySetInnerHTML={{
                    __html: `
            import Chatbox from 'https://cdn.jsdelivr.net/npm/@chaindesk/embeds@latest/dist/chatbox/index.js';
            // import Chatbox from 'http://localhost:8000/dist/chatbox/index.js';
            try {
            Chatbox.initBubble({
                agentId: 'clq6g5cuv000wpv8iddswwvnd',
                // agentId: 'clrz0tn6h000108kxfyomdzxg',
                contact: {
                  userId: '${session?.user?.id}',
                  firstName: '${session?.user?.name || ''}',
                  email: '${session?.user?.email}',
                },
                // context: '${JSON.stringify(`Task Bug Reporting: Use the following step-by-step to collect information about the bug and report it to the development team.
                // 1- Please describe the bug in detail.
                // 2- Please provide the steps to reproduce the bug.
                // 3- Please provide the expected behavior.
                // 4- Please provide your ressource ID (Agent ID or Datastore ID or Form ID)
                // 5- Please share a screenshot or a video if possible.
                // 6- Tell the user that the bug has been reported and that the development team will take care of it.
                // `)}',
                interface: {
                  // iconUrl: 'https://www.chaindesk.ai/logo.png',
                  iconUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Love%20Letter.png',
                  position: 'right',
                  bubbleButtonStyle: {
                    width: '40px',
                    height: '40px',
                  },
                  bubbleIconStyle: {
                    // padding: '4px'
                    padding: '5px'
                  },
                  iconStyle: {
                    // padding: '7px'
                    padding: '5px'
                  },
                  isInitMessagePopupDisabled: true,
                  initialMessages: [
                    'Hello <strong>${
                      session?.user?.name || session?.user?.email || ''
                    }</strong> 👋',
                    'How can I help you ?',
                  ],
                  messageTemplates: [
                    "🐛 Bug Report",
                    "💬 Product Feedback",
                    "❤️ I Love ChatsappAI",
                  ]
                } 
              });

            } catch (error) {
              console.log(error)
            }
            `,
                  }}
                />
              </Head>
            )} */}

            <List
              aria-labelledby="nav-list-browse"
              sx={{
                '& .JoyListItemButton-root': { p: '8px' },
              }}
            >
              {appLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={each.active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}

              <Divider sx={{ my: 1 }} />

              {settingLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={each.active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}
              <Divider sx={{ my: 1 }} />
              {docLinks.map((each) => (
                <NavigationLink
                  key={each.route}
                  href={each.route}
                  active={(each as any).active}
                  icon={each.icon}
                  label={each.label}
                  isExperimental={each.isExperimental}
                  isNew={each.isNew}
                  target={(each as any).target}
                />
              ))}
              {/* {(['chatsappai', 'cs', 'chat'] as ProductType[]).includes(
                product
              ) && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, mb: 1, ml: 1, fontStyle: 'italic' }}
                  >
                    Other Products
                  </Typography>

                  {(['chatsappai', 'cs'] as ProductType[]).includes(product) && (
                    <Stack spacing={1}>
                      <Link
                        href={
                          process.env.NODE_ENV === 'production'
                            ? 'https://chat.chaindesk.ai/chat'
                            : 'http://chat.localhost:3000/chat'
                        }
                      >
                        <Button
                          sx={{ width: '100%' }}
                          className="font-title"
                          color="neutral"
                          variant="soft"
                          startDecorator={<ChatRoundedIcon fontSize="sm" />}
                        >
                          Search Assistant
                        </Button>
                      </Link>
                    </Stack>
                  )}
                  {(['chat'] as ProductType[]).includes(product) && (
                    <Link
                      href={
                        process.env.NODE_ENV === 'production'
                          ? `${appUrl}/agents`
                          : 'http://localhost:3000/agents'
                      }
                    >
                      <Button
                        sx={{ width: '100%' }}
                        color="neutral"
                        variant="soft"
                        endDecorator={
                          <Chip
                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            size="sm"
                            sx={{
                              color: 'white',
                            }}
                          >
                            new
                          </Chip>
                        }
                      >
                        ChatsappAIAgents
                      </Button>
                    </Link>
                  )}

                  <Divider sx={{ my: 2 }} />
                </>
              )} */}
            </List>
          </ListItem>
        </List>

        <AccountCard />

        <Divider sx={{ my: 2 }} />

        <Stack gap={1}>
          <Link href="mailto:support@chatsappai.com" className="mx-auto">
            <Typography level="body-sm" mx={'auto'}>
              support@chatsappai.com
            </Typography>
          </Link>

          <Stack direction="row" sx={{ justifyContent: 'center', gap: 1 }}>
            <Chip color="neutral" variant="soft">
              {publicRuntimeConfig?.version}
            </Chip>

            {status && (
              <Link
                href={'https://status.chaindesk.ai/'}
                target={'_blank'}
                className={!open ? 'fixed bottom-2' : ''}
              >
                <Chip
                  color={
                    (
                      {
                        [AppStatus.OK]: 'success',
                        [AppStatus.WARNING]: 'warning',
                        [AppStatus.KO]: 'danger',
                      } as Record<AppStatus, ColorPaletteProp>
                    )[status]
                  }
                  variant="soft"
                  sx={{ cursor: 'pointer' }}
                  endDecorator={<ArrowForwardRoundedIcon />}
                >
                  <Stack direction="row" alignItems={'center'} gap={1}>
                    <Box
                      sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '99px',
                        // bgcolor: isStatusOK ? 'success.300' : 'danger.500',
                        ...(status === AppStatus.OK && {
                          bgcolor: 'success.300',
                        }),
                        ...(status === AppStatus.KO && {
                          bgcolor: 'danger.500',
                        }),
                        ...(status === AppStatus.WARNING && {
                          bgcolor: 'warning.500',
                        }),
                      }}
                    />

                    <Typography level="body-sm">system status</Typography>
                  </Stack>
                </Chip>
              </Link>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <UserMenu />
      </Stack>
      {<Divider orientation="vertical" />}
    </>
  );
}

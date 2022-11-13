import config from "../config.json";
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";

function HomePage() {
    const [filterValue, setfilterValue] = React.useState("")
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu filterValue={filterValue} setFilterValue={setfilterValue} />
                <Header />
                <Timeline filterValue={filterValue} playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    background-repeat: no-repeat;
    background-size: max(700px, 100%);
    height: 230px;
`

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ filterValue, ...props }) {
    const playlistNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistNames.map(playlistName => {
                const videos = props.playlists[playlistName]

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter(video => {
                                const titleNormalized = video.title.toLowerCase()
                                const filterValueNormalized = filterValue.toLowerCase()
                                return titleNormalized.includes(filterValueNormalized)
                            }).map(video => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}

        </StyledTimeline>
    )
}
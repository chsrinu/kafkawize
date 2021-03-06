package com.kafkamgt.uiapi.dao;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name="teams")
public class Team implements Serializable {

    @Transient
    private String teamname;

    @Transient
    private String app;

    @EmbeddedId
    private TeamPK teamPK;

    @Column(name = "teammail")
    private String teammail;

    @Column(name = "teamphone")
    private String teamphone;

    @Column(name = "contactperson")
    private String contactperson;

    public String getTeamname() {
        if(this.teamPK == null)
            return this.teamname;
        else
            return this.teamPK.getTeamname();
    }

    public void setTeamname(String teamname) {
        this.teamname = teamname;
    }

    public String getApp() {
        if(this.teamPK == null)
            return this.app;
        else
            return getTeamPK().getApp();
    }

    public void setApp(String app) {
        this.app = app;
    }

    public TeamPK getTeamPK() {
        return teamPK;
    }

    public void setTeamPK(TeamPK teamPK) {
        this.teamPK = teamPK;
        this.app = teamPK.getApp();
        this.teamname = teamPK.getTeamname();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Team)) return false;
        Team that = (Team) o;
        return Objects.equals(getTeamPK(), that.getTeamPK()) &&
                Objects.equals(getTeammail(), that.getTeammail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getTeamPK());
    }
}

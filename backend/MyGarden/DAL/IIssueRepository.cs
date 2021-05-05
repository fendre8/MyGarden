using MyGarden.API.DTO;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IIssueRepository
    {
        Task<IEnumerable<Issue>> List();

        Task<NewIssueResponse> CreateIssueForPlant(NewIssueModel issue);

        void AddCommentForIssue(Issue issue, Answer answer);

    }
}
